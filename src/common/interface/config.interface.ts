interface DatabaseConfig {
  db: string;
  host: string;
  password: string;
  port: number;
  uri: string;
  username: string;
}


export interface AppConfig {
  database: DatabaseConfig;
  port: number;
}
