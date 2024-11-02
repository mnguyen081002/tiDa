import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class GeneralService {
  private readonly logger: Logger = new Logger(GeneralService.name);
  constructor() {}
}
