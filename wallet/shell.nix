with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "build-env";
  buildInputs = [
    nodejs-10_x
    yarn
  ];
}
