-- CreateTable
CREATE TABLE "ImageReview" (
    "id" UUID NOT NULL,
    "image_id" UUID NOT NULL,
    "review_id" UUID NOT NULL,

    CONSTRAINT "ImageReview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageReview" ADD CONSTRAINT "ImageReview_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageReview" ADD CONSTRAINT "ImageReview_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
