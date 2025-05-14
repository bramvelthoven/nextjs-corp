import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"


export default function HomePage() {
  return (
    <div className="h-dvh bg-muted/40 p-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back. Here's whats happening today.</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Active users this week</CardDescription>
                </CardHeader>
                <CardContent className="text-4xl font-bold">1,240</CardContent>
                <CardFooter>
                  <Badge variant="outline">+12% since last week</Badge>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                  <CardDescription>From subscriptions</CardDescription>
                </CardHeader>
                <CardContent className="text-4xl font-bold">$8,420</CardContent>
                <CardFooter>
                  <Badge variant="secondary">+5% from last month</Badge>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle>Search Users</CardTitle>
                <CardDescription>Find a user by name or email.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Input placeholder="Enter a name or email..." className="flex-1" />
                <Button>Search</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline">Account Settings</Button>
                <Button variant="outline">Notifications</Button>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator />
      </div>
    </div>
  )
}
