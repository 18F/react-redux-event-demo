import { type as incrementType } from "../eventCreators/increment";

import incrementHandler from "../handlers/increment";

export default (event) => {
  switch (event.type) {
  case incrementType:
    incrementHandler();
  }
};
