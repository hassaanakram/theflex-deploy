import { api } from "@/api"
import { PropertyOverviewType, PropertyOverviewResponse } from "@/types";

export async function fetchPropertiesOverview(
  timeRange: string = "30d"
): Promise<PropertyOverviewType[]> {
  const data = await api.get<PropertyOverviewResponse>(
    `/api/properties/list?timeRange=${timeRange}`
  );
  return data.properties;
}
