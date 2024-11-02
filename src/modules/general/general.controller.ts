import { Controller } from "@nestjs/common";
import { ResponseDefault } from "../../common/dto/response_default";
import { GeneralService } from "./general.service";

@Controller("general")
export class GeneralController {
  constructor(private generalService: GeneralService) {}
}
