export class HttpResponse {
  static ok<T>(res: any, data: T, message = "Operación exitosa"): any {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  static created<T>(
    res: any,
    data: T,
    message = "Recurso creado correctamente"
  ): any {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  static badRequest(
    res: any,
    message = "Solicitud inválida",
    details?: string
  ): any {
    return res.status(400).json({
      success: false,
      message,
      error: { code: "BAD_REQUEST", details },
    });
  }

  static notFound(res: any, message = "Recurso no encontrado"): any {
    return res.status(404).json({
      success: false,
      message,
      error: { code: "NOT_FOUND" },
    });
  }

  static internalError(res: any, error: any): any {
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: {
        code: error.code || "INTERNAL_ERROR",
        details: error.message || String(error),
      },
    });
  }
}
