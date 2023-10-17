import { Cloudinary } from "@cloudinary/url-gen";

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "rhyzschoolwebapp",
    apiKey: "311467433777757",
    apiSecret: "PxJ2HBphKbE_b90HiORiTPRNNZg",
    // authToken:
  },
});
