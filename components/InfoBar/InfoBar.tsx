import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CreatedConfigs } from "./CreatedConfigs";
import { CredentialsForm } from "./CredentialsForm";

const InfoBar = () => {
  return (
    <Tabs
      defaultValue="Info"
      className="w-full border-l p-4 border-muted shadow-popover"
    >
      <TabsList className="min-w-full">
        <TabsTrigger className="w-1/2" value="Info">
          FLow Info
        </TabsTrigger>
        <TabsTrigger className="w-1/2" value="Configuration">
          Created Config
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Info">
        <CredentialsForm />
      </TabsContent>
      <TabsContent value="Configuration">
        <CreatedConfigs />
      </TabsContent>
    </Tabs>
  );
};

export default InfoBar;
