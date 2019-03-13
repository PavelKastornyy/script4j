# Script4J
Script4J is a set of libraries that allows to write programs and libraries in TypeScript/JavaScript using Java API.

## Modules
Java 9 introduced the Java Platform Module System (JPMS). On the other side ECMAScript 2015 introduced JavaScript 
module system. In Script4J, JPMS modules are mapped to JavaScript modules. For example, `Object` class from
`java.base` is located in `script4j.base` module.

However, for development time every class is placed in separate ES2015 class-module for convenience. During code
building on the base of such class-modules one total module is generated (in `.ts` and `.js`) according to the rules in
`module-info.js` file.

At the same time JPMS module can contain packages, but ES2015 module can't. Because of this it is not possible to have
classes with the same name inside one ES2015 module.

## Code building
For all commands it is possible to use only `npm run`. To build all:
```
git clone https://github.com/PavelKastornyy/script4j.git
cd script4j
npm run install-all
npm run build-all
```
After it all compiled and modified JavaScript modules can be found in `script4j/dist` folder. TypeScript modules are 
located in `modules/<module-name>/dist` folder.

## Code testing
Built for production ES2015 module can have much more classes then it exports. So, it is necessary to have another way
to test all classes, even those which are not exported. To do it a special ES2015 module is created for being tested and
is placed in `modules/<module-name>/tmp` folder. This module exports all the classes it has.

To test all modules run the following command:
```
npm run test-all
```

To test one module run the following commands:
```
cd modules/<module-name>
npm run test-module
```

## Contributing to Script4J
Any help would be greatly appreciated!

## License

Script4J is licensed under the GNU General Public License, version 2, with the Classpath Exception.

