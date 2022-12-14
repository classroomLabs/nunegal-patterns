export abstract class BusinessTemplate {
  public execute(payload: string): string {
    console.log("âšī¸  starting business action");
    let businessResult = "";
    try {
      businessResult = this.doMainLogic(payload);
    } catch (error) {
      console.log("âšī¸ đĩâđĢ error: " + error);
    }
    return businessResult;
  }

  protected abstract doPaymentTransaction(payload: string): string;

  protected abstract performBusinessAction(payload: string): string;

  protected sendNotification(payload = ""): void {
    console.log("â Done " + payload);
  }

  private doMainLogic(payload: string): string {
    const paymentResult = this.doPaymentTransaction(payload);
    console.log("âšī¸  payment done");
    const businessResult = this.performBusinessAction(paymentResult);
    console.log("âšī¸  action done");
    this.sendNotification(businessResult);
    console.log("âšī¸  notification done");
    return businessResult;
  }
}

export class BookingTrip extends BusinessTemplate {
  protected doPaymentTransaction(payload: string): string {
    return "đ¸  Paying trip";
  }
  protected performBusinessAction(): string {
    return "đ Booking trip";
  }
  protected override sendNotification(payload: string): void {
    console.log("đ§ Trip booked");
  }
}

export class CancelTrip extends BusinessTemplate {
  protected doPaymentTransaction(payload: string): string {
    return "đ¤  Refunding trip";
  }
  protected override performBusinessAction(): string {
    return "đ­  Cancelling trip";
  }
}

export class Client {
  private booking = new BookingTrip();
  private cancel = new CancelTrip();
  public run(): void {
    this.booking.execute("The Moon");
    this.cancel.execute("The Moon");
  }
}

const client = new Client();
client.run();
