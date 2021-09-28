export class CreateDiagnosisDto {
  group: string;
  kind: string;
  label?: Record<string, unknown>;
}
