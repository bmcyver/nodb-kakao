export class EventQueue {
  private queue: Array<() => Promise<void>>;
  private processing: boolean;

  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async enqueue(event: () => Promise<void>): Promise<void> {
    this.queue.push(event);
    if (!this.processing) {
      this.processing = true;
      await this.processQueue();
      this.processing = false;
    }
  }

  private async processQueue(): Promise<void> {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) {
        await event();
      }
    }
  }
}
