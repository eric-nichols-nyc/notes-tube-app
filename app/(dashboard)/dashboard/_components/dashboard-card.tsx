import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

const DashboardCard = () => {
  return (
    <Link href="/dashboard/detail/1234">
      <Card>
        <CardHeader>
          <CardContent className="grid">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="/placeholder.png"
                alt="Photo by Drew Beamer"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </CardContent>
          <CardDescription>Card title 1</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default DashboardCard;
