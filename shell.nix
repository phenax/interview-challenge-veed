with import <nixpkgs> { };
mkShell {
  buildInputs = [
    nodejs-18_x
    yarn
    typescript
    nodePackages.typescript-language-server
  ];
}
