import React from "react";
import { notFound } from "next/navigation";
import DesignDetailClient from "@/components/design-detail-client";
import { getDesign } from "@/lib/api";

export default async function DesignPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  let design = null;
  try {
    design = await getDesign(resolvedParams.id);
  } catch (err) {
    // Return not found if the API call fails or returns 404
    return notFound();
  }

  if (!design) {
    return notFound();
  }

  return <DesignDetailClient design={design} />;
}

