import { DomainEntity, IDomainEntity, JSONArray, JSONObject } from '@app/domain';
import { AnnotationType } from './annotation-type.model';
import { ValueTypes } from './value-type.enum';

type AnnotationValueType = string | Date | Number | string[];

/**
 * Annotations allow the system to collect custom named and defined pieces of data.
 *
 * The type information for an Annotation is stored in an {@link app.domain.annotations.AnnotationType
 * AnnotationType}.
 */
export interface IAnnotation extends IDomainEntity {

  /**
   * The ID of the {@link app.domain.annotations.AnnotationType| AnnotationType} that defines
   * the contents of this annotation.
   */
  annotationTypeId: string;

  valueType: ValueTypes;

  /** The value stored in this annotation. */
  value: AnnotationValueType;

}

export abstract class Annotation extends DomainEntity implements IAnnotation {

  annotationTypeId: string;
  valueType: ValueTypes;
  value: AnnotationValueType;
  _annotationType: AnnotationType;

  get label(): string {
    return this._annotationType.name;
  }

  get annotationType(): AnnotationType {
    return this._annotationType;
  }

  set annotationType(at: AnnotationType) {
    this.valueType = at.valueType;
    this._annotationType = at;
  }

  abstract serverAnnotation(): any;

  deserialize(input: IAnnotation): this {
    const { annotationTypeId, valueType } = input;
    Object.assign(this, { annotationTypeId, valueType });
    super.deserialize(input);
    return this;
  }

}