// MCE Entry Source Types

export interface Contact {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  customerId?: string;
  createdAt: string;
  [key: string]: string | undefined;
}

export interface ExecuteRequest {
  inArguments: Record<string, unknown>[];
  outArguments: Record<string, unknown>[];
  activityObjectID: string;
  journeyId: string;
  activityId: string;
  definitionInstanceId: string;
  activityInstanceId: string;
  keyValue: string;
  mode: number;
}

export interface ExecuteResponse {
  status: "ok" | "error";
  data?: Contact[];
  message?: string;
}

export interface ConfigResponse {
  workflowApiVersion: string;
  key?: string;
  metaData: {
    icon: string;
    category: string;
  };
  type: string;
  lang: {
    [locale: string]: {
      name: string;
      description: string;
    };
  };
  arguments: {
    execute: {
      inArguments: Record<string, unknown>[];
      outArguments: {
        contactKey: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        customerId: string;
      }[];
    };
  };
  configurationArguments: {
    publish: {
      url: string;
    };
    validate: {
      url: string;
    };
    stop: {
      url: string;
    };
    save?: {
      url: string;
    };
  };
  wizardSteps?: Array<{
    label: string;
    key: string;
  }>;
  userInterfaces: {
    configModal?: {
      url: string;
      height: number;
      width: number;
    };
  };
  schema: {
    arguments: {
      execute: {
        outArguments: Array<{
          [key: string]: {
            dataType: string;
            direction: string;
            access: string;
          };
        }>;
      };
    };
  };
}

export interface ValidateRequest {
  activityObjectID: string;
  interactionId: string;
  originalDefinitionId: string;
  interactionVersion: string;
  isPublished: boolean;
}

export interface PublishRequest {
  activityObjectID: string;
  interactionId: string;
  originalDefinitionId: string;
  interactionVersion: string;
  isPublished: boolean;
}

export interface StopRequest {
  activityObjectID: string;
  interactionId: string;
  originalDefinitionId: string;
  interactionVersion: string;
}

export interface SaveRequest {
  activityObjectID: string;
  interactionId: string;
  originalDefinitionId: string;
  interactionVersion: string;
}
