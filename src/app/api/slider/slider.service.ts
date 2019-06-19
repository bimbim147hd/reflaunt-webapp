import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import Slider from '../../models/Slider';

@Injectable()
export class SliderService extends BaseService {
  public url = '/api/sliders';
  public model = Slider;
}
