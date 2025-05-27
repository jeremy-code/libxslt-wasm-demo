const throwError = (
  ...errorArguments: ConstructorParameters<ErrorConstructor>
) => {
  throw new Error(...errorArguments);
};

export { throwError };
