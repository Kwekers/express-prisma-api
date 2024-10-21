-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
