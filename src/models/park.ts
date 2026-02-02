import mongoose, { Model, Schema } from 'mongoose';

interface IPark {
    title: string;
    type: string;
    address: string;
    size: number;
    amenities: string;
}

const ParkSchema = new Schema<IPark>({
    title: {
        type: String,
        required: [true, 'Title Required']
    },
    type: {
        type: String,
        required: [true, 'Type Required']
    },
    address: {
        type: String,
        required: [true, 'Adress Required']
    },
    size: {
        type: Number
    },
    amenities: {
        type: String
    }
});

// create Model def and make public
const Park = mongoose.model<IPark>('Park', ParkSchema);
export default Park;