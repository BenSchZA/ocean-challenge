with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "build-env";
  buildInputs = [
    docker
    docker_compose
    nodejs-12_x
    yarn
    pkgconfig
    autoconf
    automake
    libudev
    libtool
    libusb
    libusb.dev
    libusb1
    libusb1.dev
    nasm
    autogen
    zlib
    # nodePackages.node-gyp
    # nodePackages.node-gyp-build
    # nodePackages.node-pre-gyp
    python
    pythonPackages.pip
    pythonPackages.setuptools
  ];
}
