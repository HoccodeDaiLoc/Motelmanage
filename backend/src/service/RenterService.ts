import { Inject, Service } from "typedi";
import { Renter } from "../models/Renter";
import { IRenterService } from "./Interfaces/IRenterService";
import { RenterRepository } from "../repository/RenterRepository";
import { IRenterRepository } from "../repository/Interfaces/IRenterRepository";
import { RentalRecordRepository } from "../repository/RentalRecordRepository";
import { IRentalRecordRepository } from "../repository/Interfaces/IRentalRecordRepository";

@Service()
export class RenterService implements IRenterService {
  @Inject(() => RenterRepository)
  renterRepository!: IRenterRepository;

  @Inject(() => RentalRecordRepository)
  rentalRecordRepository!: IRentalRecordRepository;

  async getAllRenter(page: number, limit: number): Promise<Renter[]> {
    try {
      return await this.renterRepository.getAllRenter(page, limit);
    } catch (err) {
      throw err;
    }
  }

  async getRenterById(id: number): Promise<Renter | null> {
    try {
      return await this.renterRepository.getRenterById(id);
    } catch (err) {
      throw err;
    }
  }

  async deleteRenterById(id: number): Promise<void> {
    try {
      await this.renterRepository.deleteRenterById(id);
    } catch (err) {
      throw err;
    }
  }

  async addRenter(
    name: string,
    dateOfBirth: Date,
    address: string,
    phone: string,
    email: string,
    cccd: string,
    roomId: number | undefined,
    checkInDate: Date | undefined,
    checkOutDate: Date | undefined
  ): Promise<Renter> {
    try {
      const newRenter = await this.renterRepository.createRenter(
        name,
        dateOfBirth,
        address,
        phone,
        email,
        cccd
      );
      if (roomId) {
        await this.rentalRecordRepository.createRentalRecord(
          checkInDate,
          checkOutDate,
          roomId,
          newRenter.renterId
        );
      }
      return newRenter;
    } catch (err) {
      throw err;
    }
  }
  
  async updateRenterById(id: number, newData: any): Promise<Renter> {
    try {
      return await this.renterRepository.updateRenterById(id, newData);
    } catch (err) {
      throw err;
    }
  }
}