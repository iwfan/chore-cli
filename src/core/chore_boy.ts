import { Chore } from '../typing';
import ora from 'ora';
import chalk from 'chalk';

export class ChoreBoy {
  private chores: Chore[] = [];

  public pipe(...chores: Chore[]) {
    this.chores = [...this.chores, ...chores];
    return this;
  }

  public async do(context: any) {
    for (let chore of this.chores) {
      const { name = 'unnamed task' } = chore;
      const spinner = ora(`starting ${name}`);
      spinner.start();
      try {
        await chore(context);
        spinner.succeed(`${name} finished!`);
      } catch (e) {
        spinner.fail(`${name} error!`);
        throw e;
      }
    }
  }
}
