export class ParkingRecord {
  constructor(
    public id: string,
    public plate: string,
    public entryTime: Date,
    public exitTime: Date | null = null,
    public readonly createdBy: string,
  ) {}

  // Método para registrar salida
  exit() {
    if (this.exitTime) {
      throw new Error('Este vehículo ya ha salido.');
    }
    this.exitTime = new Date();
  }

  // Método para saber si está estacionado
  isParked(): boolean {
    return this.exitTime === null;
  }
}