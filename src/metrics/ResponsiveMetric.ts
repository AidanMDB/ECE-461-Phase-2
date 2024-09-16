import {Metric} from './Metric';
import { URLHandler } from '../urlUtils/URLHandler';

class ResponsiveMetric extends Metric {
    constructor(url: URLHandler) {
        super(url);
    }
    calculateScore(): number {
        this.score = Math.random()*10;

        return this.score;
    }
}