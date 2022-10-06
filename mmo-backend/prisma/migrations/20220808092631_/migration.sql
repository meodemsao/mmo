-- CreateEnum
CREATE TYPE "Gateway" AS ENUM ('paypal', 'bitcoin', 'ethereum', 'stripe', 'momo');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('notPaid', 'chargeBack', 'highRisk', 'partiallyPaid', 'awaitingPaymentConfirmation', 'pendding', 'refunded', 'successful');

-- CreateTable
CREATE TABLE "MetaData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "size" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "mine_type" TEXT NOT NULL,

    CONSTRAINT "MetaData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "metaId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL,
    "unlisted" BOOLEAN NOT NULL,
    "vpn_block" BOOLEAN NOT NULL,
    "seller_note" TEXT NOT NULL,
    "maximumQuantity" INTEGER NOT NULL,
    "minimumQuantity" INTEGER NOT NULL,
    "stockDelimiter" TEXT NOT NULL,
    "stockAmount" INTEGER NOT NULL,
    "cryptoConfirmations" INTEGER NOT NULL,
    "maxRiskLevel" INTEGER NOT NULL,
    "dynamicUrl" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "webhookUrl" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "productId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("productId","categoryId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,
    "riskLevel" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "delivered" BOOLEAN NOT NULL,
    "referral" TEXT NOT NULL,
    "usdValue" INTEGER NOT NULL,
    "exchangeRate" INTEGER NOT NULL,
    "couponId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Key" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_metaId_key" ON "Image"("metaId");

-- CreateIndex
CREATE UNIQUE INDEX "Key_username_key" ON "Key"("username");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "MetaData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
