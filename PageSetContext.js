import React from "react";
// default context object with properties corresponding to Provider values

const PageSetContext = React.createContext({
  location: 0,
  game: 0,
  onReload: () => undefined
});

export default PageSetContext;