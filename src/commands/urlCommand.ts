import {Logger} from '../logUtils';
import { URLFileHandler } from '../urlUtils/URLFileHandler';
import { BusFactor } from '../metrics/BusFactor';
import { Correctness } from '../metrics/Correctness';
import { RampUp } from '../metrics/RampUp';
import { License } from '../metrics/License';
import { ResponsiveMetric } from '../metrics/ResponsiveMetric';
import { NetScore } from '../metrics/NetScore';

export async function urlCommand (argument:string) {

    const urls = await URLFileHandler.getGithubUrlsFromFile(argument);
    if (urls === null) {
      Logger.logInfo('Error reading file or invalid URLs');
      process.exit(1)
    }
    
    for (const url of urls) {
      Logger.logInfo(`Processing URL: ${url}`);
      const busFactor = new BusFactor(url);
      busFactor.calculateScore();
      const corScore = new Correctness(url);
      corScore.calculateScore();
      const rampUp = new RampUp(url);
      rampUp.calculateScore();
      const licScore = new License(url);
      licScore.calculateScore();
      const respMet = new ResponsiveMetric(url);
      respMet.calculateScore();

      const netScore = new NetScore().calculateScore(busFactor, corScore, licScore, rampUp, respMet);

      // TODO: Function to parse netScore and individual scores to NDJSON
    }
} 