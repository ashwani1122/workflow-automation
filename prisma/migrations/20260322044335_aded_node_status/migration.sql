-- CreateEnum
CREATE TYPE "NodeStatus" AS ENUM ('Pending', 'Running', 'Success', 'Failed', 'Skipped');

-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "status" "NodeStatus" NOT NULL DEFAULT 'Pending';
