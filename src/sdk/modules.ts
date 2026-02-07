export interface OminityModules {}

export type OminityModuleDefinition<Client, Name extends string, Mod> = {
  name: Name;
  init(client: Client): Mod;
};

export type OminityModuleFactory<Client, Name extends string, Mod> = () => OminityModuleDefinition<
  Client,
  Name,
  Mod
>;

export type OminityModuleInput<Client> =
  | OminityModuleDefinition<Client, string, unknown>
  | OminityModuleFactory<Client, string, unknown>;
