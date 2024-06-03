import { Inject, Service } from "typedi";
import { IElectricReadingService } from "./Interfaces/IElectricReadingService";
import { IElectricReadingRepository } from "../repository/Interfaces/IElectricReadingRepository";
import { ElectricReadingRepository } from "../repository/ElectricReadingRepository";
import { ElectricityMeterReading } from "../models/ElectricityMeterReading";
import { AppError } from "../errors/AppError";

@Service()
export class ElectricReadingService implements IElectricReadingService {
  @Inject(() => ElectricReadingRepository)
  private electricReadingRepository!: IElectricReadingRepository;

  async addElectricReading(
    electricNumber: number,
    date: Date,
    roomId: number
  ): Promise<void> {
    try {
      await this.electricReadingRepository.createElectricReading(
        electricNumber,
        date,
        roomId
      );
    } catch (err) {
      throw err;
    }
  }

  async getElectricReadingById(id: number): Promise<ElectricityMeterReading> {
    try {
      const electricReading =
        await this.electricReadingRepository.getElectricReadingById(id);
      if (!electricReading) {
        throw new AppError("Electric reading not found", 404);
      }
      return electricReading;
    } catch (err) {
      throw err;
    }
  }

  async getElectricReadingByRoomIdAndDate(
    roomId: number,
    date: Date
  ): Promise<ElectricityMeterReading> {
    try {
      const electricReading =
        await this.electricReadingRepository.getElectricReadingByRoomIdAndDate(
          roomId,
          date
        );
      if (!electricReading) {
        throw new AppError("Electric reading not found", 404);
      }
      return electricReading;
    } catch (err) {
      throw err;
    }
  }

  async getLastestElectricReading(
    roomId: number
  ): Promise<ElectricityMeterReading> {
    try {
      const electricReading =
        await this.electricReadingRepository.getLatestElectricReading(roomId);
      if (!electricReading) {
        throw new AppError("Electric reading not found", 404);
      }
      return electricReading;
    } catch (err) {
      throw err;
    }
  }
}