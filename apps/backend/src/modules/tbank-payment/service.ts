import TbankPayments from "tbank-payments"
import {
  AbstractPaymentProvider,
  MedusaError,
} from "@medusajs/framework/utils"
import type {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  ProviderWebhookPayload,
  WebhookActionResult,
} from "@medusajs/framework/types"

type Options = {
  terminalKey: string
  password: string
  apiUrl?: string
  notificationUrl?: string
}

type InjectedDependencies = {
  logger: {
    info: (message: string) => void
    error: (message: string, error?: unknown) => void
  }
}

type TbankPaymentData = {
  id: number
  payment_url?: string
  status?: string
}

class TbankPaymentProviderService extends AbstractPaymentProvider<Options> {
  static identifier = "tbank"

  protected logger_: InjectedDependencies["logger"]
  protected options_: Options
  protected client_: TbankPayments

  constructor({ logger }: InjectedDependencies, options: Options) {
    super({ logger }, options)

    this.logger_ = logger
    this.options_ = options
    this.client_ = new TbankPayments({
      merchantId: options.terminalKey,
      secret: options.password,
      apiUrl: options.apiUrl,
    })
  }

  static validateOptions(options: Options) {
    if (!options.terminalKey || !options.password) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "TBANK_TERMINAL_KEY and TBANK_PASSWORD are required."
      )
    }
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    const response = await this.client_.initPayment({
      Amount: this.amountNumeric(input.amount),
      OrderId: input.context?.idempotency_key || `medusa-${Date.now()}`,
      Description: "Order payment",
      NotificationURL: this.options_.notificationUrl,
    })

    return {
      id: String(response.PaymentId),
      data: {
        id: response.PaymentId,
        payment_url: response.PaymentURL,
        status: response.Status,
      },
    }
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    const payment = this.paymentData(input.data)
    const status = await this.client_.getPaymentState({ PaymentId: payment.id })

    return {
      data: { ...payment, status: status.Status },
      status: this.mapStatus(status.Status),
    }
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    const payment = this.paymentData(input.data)
    const response = await this.client_.confirmPayment({
      PaymentId: payment.id,
    })

    return { data: { ...payment, status: response.Status } }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    const payment = this.paymentData(input.data)
    const response = await this.client_.cancelPayment({
      PaymentId: payment.id,
      Amount: this.amountNumeric(input.amount),
    })

    return { data: { ...payment, status: response.Status } }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    const payment = this.paymentData(input.data)
    const response = await this.client_.cancelPayment({ PaymentId: payment.id })

    return { data: { ...payment, status: response.Status } }
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    const payment = this.paymentData(input.data)
    const response = await this.client_.getPaymentState({ PaymentId: payment.id })

    return {
      data: { ...payment, status: response.Status },
      status: this.mapStatus(response.Status),
    }
  }

  async retrievePayment(
    input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    const payment = this.paymentData(input.data)
    const response = await this.client_.getPaymentState({ PaymentId: payment.id })

    return { data: { ...payment, status: response.Status } }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    const previousPayment = this.paymentData(input.data)
    const response = await this.client_.initPayment({
      Amount: this.amountNumeric(input.amount),
      OrderId: String(previousPayment.id),
      Description: "Order payment",
      NotificationURL: this.options_.notificationUrl,
    })

    return {
      status: "pending",
      data: {
        id: response.PaymentId,
        payment_url: response.PaymentURL,
        status: response.Status,
      },
    }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: input.data }
  }

  async getWebhookActionAndData(
    _payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    return { action: "not_supported" }
  }

  private paymentData(data?: Record<string, unknown>): TbankPaymentData {
    const id = Number(data?.id)

    if (!Number.isInteger(id) || id <= 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "T-Bank payment ID is missing."
      )
    }

    return {
      id,
      payment_url: typeof data?.payment_url === "string" ? data.payment_url : undefined,
      status: typeof data?.status === "string" ? data.status : undefined,
    }
  }

  private amountNumeric(amount: InitiatePaymentInput["amount"]): number {
    if (typeof amount === "number") {
      return amount
    }

    if (typeof amount === "string") {
      return Number(amount)
    }

    if (typeof amount === "object" && "numeric" in amount) {
      return Number(amount.numeric)
    }

    if (typeof amount === "object" && "value" in amount) {
      return Number(amount.value)
    }

    return Number(amount)
  }

  private mapStatus(status: string): "authorized" | "captured" | "canceled" | "pending" {
    switch (status) {
      case "AUTHORIZED":
        return "authorized"
      case "CONFIRMED":
        return "captured"
      case "CANCELED":
      case "REJECTED":
      case "REFUNDED":
      case "PARTIAL_REFUNDED":
        return "canceled"
      default:
        return "pending"
    }
  }
}

export default TbankPaymentProviderService