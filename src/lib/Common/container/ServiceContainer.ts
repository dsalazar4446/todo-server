export class ServiceContainer {
  private static instances = new Map<string, unknown>();

  /**
   * Registra una instancia en el contenedor.
   * @param key Identificador único (por convención: PascalCase sin espacios)
   * @param instance Instancia o servicio
   */
  static register<T>(key: string, instance: T): void {
    if (this.instances.has(key)) {
      throw new Error(`Service '${key}' is already registered.`);
    }
    this.instances.set(key, instance);
  }

  /**
   * Obtiene una instancia registrada.
   * @param key Identificador del servicio
   * @returns Instancia del servicio registrado
   */
  static resolve<T>(key: string): T {
    const instance = this.instances.get(key);
    if (!instance) {
      throw new Error(`Service '${key}' is not registered.`);
    }
    return instance as T;
  }

  /**
   * Limpia el contenedor de servicios registrados
   */
  static reset(): void {
    this.instances.clear();
  }

  /**
   * Verifica si un servicio está registrado
   */
  static has(key: string): boolean {
    return this.instances.has(key);
  }
}
