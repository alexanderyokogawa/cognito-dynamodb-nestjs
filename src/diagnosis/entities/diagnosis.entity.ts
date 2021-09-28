interface LabelGroup {
  es_mx?: string;
  pt_br?: string;
  en_us?: string;
}
export class Diagnosis {
  id: string;
  group: string;
  kind: string;
  label?: LabelGroup;
  createdAt?: string;
  updatedAt?: string;
}
