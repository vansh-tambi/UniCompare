import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse {
  name: string;
  duration: string;
}

export interface IPlacement {
  year: number;
  highestPackage: number;
  averagePackage: number;
}

export interface IReview {
  userName: string;
  rating: number;
  text: string;
}

export interface ICollege extends Document {
  name: string;
  location: string;
  fees: number;
  rating: number;
  description: string;
  image_url: string;
  courses: ICourse[];
  placements: IPlacement[];
  reviews: IReview[];
}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
});

const PlacementSchema: Schema = new Schema({
  year: { type: Number, required: true },
  highestPackage: { type: Number, required: true },
  averagePackage: { type: Number, required: true },
});

const ReviewSchema: Schema = new Schema({
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
}, { timestamps: true });

const CollegeSchema: Schema = new Schema({
  name: { type: String, required: true, index: true },
  location: { type: String, required: true },
  fees: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  courses: [CourseSchema],
  placements: [PlacementSchema],
  reviews: [ReviewSchema],
}, { timestamps: true });

const College: Model<ICollege> = mongoose.models.College || mongoose.model<ICollege>('College', CollegeSchema);

export default College;
