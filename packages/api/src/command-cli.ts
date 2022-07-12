import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

const run = async () => {
  await CommandFactory.run(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
};

run();
