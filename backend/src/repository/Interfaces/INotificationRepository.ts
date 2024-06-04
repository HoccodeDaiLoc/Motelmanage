import { BaseInterface } from "./BaseInterface";
import { Notification } from "../../models/Notification";

export interface INotificationRepository extends BaseInterface {
  getListNotification(
    searchCondidate: any,
    limit: number,
    page: number
  ): Promise<Notification[] | null>;
  getNotification(searchCondidate: any): Promise<Notification | null>;
  createNotification(
    title: string,
    content: string,
    dateCreated: Date,
    isRead: boolean | undefined
  ): Promise<Notification | null>;
}