import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  MessageCircleWarning,
  SquareArrowOutUpRightIcon,
  Terminal,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { DbMockFormSchema } from "../../lib/Schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "../ui/separator";
import { useFilePath } from "@/contexts/FilePathContext";

export const CredentialsForm = () => {
  const searchParams = useSearchParams();
  const { setFilePath } = useFilePath();
  const router = useRouter();
  const form = useForm<z.infer<typeof DbMockFormSchema>>({
    resolver: zodResolver(DbMockFormSchema),
    defaultValues: {
      mock: false,
      flow: "",
      databaseUser: "",
      databasePassword: "",
      databaseHostname: "",
      dependency: [],
      port: "",
    },
  });
  const {
    data: Dependencies,
    refetch,
    isLoading,
  } = useQuery<FlowWithDependencies>({
    queryKey: ["dependencies", form.getValues("flow").split("/")[1]],
    queryFn: () =>
      axios
        .get(
          `api/dependencies?flow=${form.getValues("flow").split("/")[1].trim()}`
        )
        .then((res) => res.data),
    enabled: !!form.getValues("flow"),
  });
  const {
    mutate,
    isPending: isMutating,
    data: ConfigurationResponse,
  } = useMutation({
    mutationFn: (data: z.infer<typeof DbMockFormSchema>) => {
      return axios.post("/api/configuration", data);
    },
    onSuccess: () => {
      toast.success("Configuration Created", {});
    },
  });
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === "flow") {
        refetch();
        // console.log(type);
        setFilePath([value.flow ?? ""]);
        router.push(
          `?endpoint=${encodeURIComponent(value.flow ?? "")}`,
          undefined
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = (data: z.infer<typeof DbMockFormSchema>) => {
    toast.info("Creating Your Configuration");
    toast.dismiss();
    mutate(data);
    // console.log(data);
  };
  useEffect(() => {
    const endpoint = decodeURIComponent(searchParams.get("endpoint") || "");
    if (endpoint) {
      form.setValue("flow", endpoint);
    } else {
      form.setValue("flow", "carts");
    }
  }, [form, searchParams]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap gap-12 w-full h-full"
      >
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Cart Campaign</AlertTitle>
          <AlertDescription className="space-y-3 mt-3">
            <div className="flex items-center space-x-2">
              <MessageCircleWarning className="w-4 h-4 rounded-full bg-orange-400" />
              <label
                htmlFor="commits"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Last two commits scaled
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircleWarning className="w-4 h-4 rounded-full bg-orange-400" />
              <label
                htmlFor="entrypoints"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                5 entry points identified
              </label>
            </div>
          </AlertDescription>
        </Alert>
        <FormField
          name="flow"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                <div className="space-y-1 ">
                  <h4 className="text-sm font-medium leading-none">
                    Selected Flow
                  </h4>
                </div>
              </FormLabel>
              <FormControl>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={decodeURIComponent(
                    searchParams.get("endpoint") || ""
                  )}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a flow" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="POST/carts/{cart_id}">
                      {JSON.stringify("POST/carts/{cart_id}", null, 2)}
                    </SelectItem>
                    <SelectItem value="POST/product/{product_id}">
                      {JSON.stringify("POST/product/{product_id}", null, 2)}
                    </SelectItem>
                    <SelectItem value="POST/order/{order_id}">
                      {JSON.stringify("POST/order/{order_id}", null, 2)}
                    </SelectItem>
                    <SelectItem value="GET /user/{id}">
                      {JSON.stringify("GET /user/{id}", null, 2)}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="dependency"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full space-y-5">
              <FormLabel>
                <div className="space-y-1 ">
                  <h4 className="text-sm font-medium leading-none">
                    Dependencies
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Select the ones you want to mock
                  </p>
                </div>
              </FormLabel>
              {Dependencies?.dependencies.map((item: Dependency, index) => (
                <FormItem
                  key={item.name}
                  className="flex flex-row items-start space-x-3 space-y-0 "
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value.includes(item.name)}
                      onCheckedChange={(checked) => {
                        const updatedValues = checked
                          ? [...field.value, item.name]
                          : field.value.filter((dep) => dep !== item.name);
                        form.setValue("dependency", updatedValues);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal flex items-center justify-between w-full">
                    {item.name}
                    <SquareArrowOutUpRightIcon className="h-4 w-4 cursor-pointer text-orange-500" />
                  </FormLabel>
                </FormItem>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mock"
          render={({ field }) => (
            <FormItem className="space-x-3 space-y-4 rounded-md w-full p-4">
              <div className="space-y-1 leading-none">
                <FormLabel>Database</FormLabel>
                <FormDescription>
                  Select if you want to mock the database
                </FormDescription>
              </div>
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={(checked) => {
                      form.setValue("mock", true);
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  I want to mock the database
                </FormLabel>
              </FormItem>
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === false}
                    onCheckedChange={(checked) => {
                      form.setValue("mock", false);
                    }}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  I don&apos;t want to mock the database
                </FormLabel>
              </FormItem>
            </FormItem>
          )}
        />
        <Card className="w-full border-none">
          <CardHeader>
            <CardTitle className="text-2xl">Database Configurations</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="databaseUser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database User</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="databasePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database Password</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="databaseHostname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database Hostname</FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="port"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database Port</FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <div className="flex flex-col gap-3 w-full">
          <Separator />
          <Button
            disabled={isLoading || isMutating}
            className="w-1/5 ml-auto"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
