
import { GetFormStats } from "@/actions/form";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { ReactNode, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";



export default function Home() {
  return (
   <div className="w-full px-4 pt-4 md:px-6 lg:px-8">
     <Suspense fallback={<StatsCards loading />}>
       <CardStatsWrapper />
     </Suspense>
     <Separator className="my-4" />
    <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
     <Separator className="my-4" />
     <CreateFormBtn />
   </div>
  );
}


async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards({ data, loading }: StatsCardsProps) {
  const formatPercent = (value: number | undefined) =>
    `${(value ?? 0).toFixed(1)} %`;

  return <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
    <StatsCard 
    title="total visits"
    icon={<LuView className="size-5 text-blue-600" />}
    helperText="All time form visits"
    value={data?.visits.toLocaleString() ?? "0"}
    loading={loading}
    className="shadow-lg shadow-blue-600/20"
    /> 
    <StatsCard 
    title="total submissions"
    icon={<FaWpforms className="size-5 text-yellow-600" />}
    helperText="All time form submissions"
    value={data?.submissions.toLocaleString() ?? "0"}
    loading={loading}
    className="shadow-lg shadow-yellow-600/20"
    /> 
    <StatsCard 
    title="Submission Rate"
    icon={<HiCursorClick className="size-5 text-green-600" />}
    helperText="Percentage of visits that submit"
    value={formatPercent(data?.submissionRate)}
    loading={loading}
    className="shadow-lg shadow-green-600/20"
    /> 

     <StatsCard 
    title="Bounce Rate"
    icon={<TbArrowBounce className="size-5 text-red-600" />}
    helperText="Visits that leave without submitting"
    value={formatPercent(data?.bounceRate)}
    loading={loading}
    className="shadow-lg shadow-red-600/20"
    /> 

  </div>
}



function StatsCard(
  {
    title,
    value,
    helperText,
    className,
    loading,
    icon
  } : {
  title:string,
  loading:boolean,
  helperText:string,
  className:string,
  value:string,
  icon:ReactNode
}
){
   return <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground "> 
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {loading && (
          <Skeleton>
            <span className="opacity-0 ">0</span>
          </Skeleton>
        ) 
        }
        {!loading && value}
      </div>
      <p className="pt-1 text-xs text-muted-foreground">{helperText}</p>
    </CardContent>
   </Card>
}