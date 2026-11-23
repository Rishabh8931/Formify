
import { GetFormStats, GetForms } from "@/actions/form";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { ReactNode, Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Form } from "../generated/prisma/browser";



export default function Home() {
  return (
   <div className="w-full px-4 pt-4 md:px-6 lg:px-8">
     <Suspense fallback={<StatsCards loading />}>
       <CardStatsWrapper />
     </Suspense>
     <Separator className="my-4" />
    <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
     <Separator className="my-4" />
     
     <div 
     className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
     ><CreateFormBtn /></div>

     <Suspense fallback={[1,2,3,4].map((i) => <FormCardSkeleton key={i} />)}>

<FormCards />

     </Suspense>
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


function FormCardSkeleton() {

  return <Skeleton 
  className="border-2 border-primary/20 h-[190px] w-full"
  />


}

 async function FormCards() {

const forms = await GetForms();

 return (
   <div className="grid w-full grid-cols-1 gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
     {forms.map((form) => (
       <FormCard key={form.id} form={form} />
     ))}
   </div>
 );
}


function FormCard({form}: {form: Form}){
   return (
     <Card className="h-[190px] transition-shadow hover:shadow-md">
       <CardHeader className="flex flex-row items-start justify-between gap-4">
         <div className="min-w-0">
           <CardTitle className="truncate text-bold">{form.name}</CardTitle>
           <CardDescription className="mt-1 line-clamp-2">
             {form.description || "No description provided."}
           </CardDescription>
         </div>
         <Badge variant={form.published ? "destructive" : "secondary"}>
           {form.published ? "Published" : "Draft"}
         </Badge>
       </CardHeader>
       <CardContent className="grid grid-cols-2 gap-4">
         <div>
           <p className="text-2xl font-bold">{form.visits.toLocaleString()}</p>
           <p className="text-xs text-muted-foreground">Visits</p>
         </div>
         <div>
           <p className="text-2xl font-bold">{form.submissions.toLocaleString()}</p>
           <p className="text-xs text-muted-foreground">Submissions</p>
         </div>
       </CardContent>
       <CardFooter className="mt-auto text-xs text-muted-foreground">
         Created {form.createdAt.toLocaleDateString()}
       </CardFooter>
     </Card>
   );
}