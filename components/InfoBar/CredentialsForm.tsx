import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
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

export const CredentialsForm = () => {
  const form = useForm<z.infer<typeof DbMockFormSchema>>({
    resolver: zodResolver(DbMockFormSchema),
    defaultValues: {
      mock: false,
      flow: "carts",
      username: "",
      password: "",
      dependency: [],
    },
  });

  const {
    data: Dependencies,
    refetch,
    isLoading,
  } = useQuery<FlowWithDependencies>({
    queryKey: ["dependencies", form.getValues("flow")],
    queryFn: () =>
      axios
        .get(`api/dependencies?flow=${form.getValues("flow")}`)
        .then((res) => res.data),
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
      // console.log(ConfigurationResponse);
      // form.reset();
    },
  });

  useEffect(() => {
    refetch();
  }, [form.getValues("flow"),refetch]);

  const onSubmit = (data: z.infer<typeof DbMockFormSchema>) => {
    toast.info("Creating Your Configuration");
    toast.dismiss();
    mutate(data);
    console.log(data);
  };

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
              <Checkbox id="commits" checked />
              <label
                htmlFor="commits"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Last two commits scaled
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox disabled id="entrypoints" />
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
                  <p className="text-sm text-muted-foreground">
                    Select the flow you want to perform the action on
                  </p>
                </div>
              </FormLabel>
              <FormControl>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a flow" />
                  </SelectTrigger>
                  <SelectContent defaultValue="carts">
                    <SelectItem value="carts">
                      {JSON.stringify("POST/carts/{cart_id}", null, 2)}
                    </SelectItem>

                    <SelectItem value="product">
                      {JSON.stringify("POST/product/{product_id}", null, 2)}
                    </SelectItem>

                    <SelectItem value="order">
                      {JSON.stringify("POST/order/{order_id}", null, 2)}
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
            <FormItem className="w-full">
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
                  className="flex flex-row items-start space-x-3 space-y-0"
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
                  <FormLabel className="font-normal">{item.name}</FormLabel>
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
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              These credentials will be used to login.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" required {...field} />
                  </FormControl>
                  <FormDescription>
                    This password is used to login.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              disabled={isLoading || isMutating}
              className="w-full"
              type="submit"
            >
              Create Configuration
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
