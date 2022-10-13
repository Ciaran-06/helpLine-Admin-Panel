import repl from "repl";

import config from "../src/utils/config.js";
import app from "../src/app.js";
import mongoInit from "../src/models/init.js";
import User from "../src/models/user.js";
import TestModel from "../src/models/testmodel.js";
import UserService from "../src/services/user.js";
import TestModelService from "../src/services/testmodel.js";

const main = async () => {
  await mongoInit(config.DATABASE_URL);
  process.stdout.write("Database and Express app initialized.\n");
  process.stdout.write("Autoimported modules: config, app, models, services\n");

  const r = repl.start("> ");
  r.context.config = config;
  r.context.app = app;
  r.context.models = {
    User,
    TestModel,
  };
  r.context.services = {
    UserService,
    TestModelService,
  };

  r.on("exit", () => {
    process.exit();
  });

  r.setupHistory(".shell_history", () => {});
};

main();
