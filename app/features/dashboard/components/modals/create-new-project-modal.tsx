"use client";

import { Form } from "@/components/primitives/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form as FormWrapper } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  domain: z.string().min(1),
});

function CreateNewProjectModal() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      domain: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <FormWrapper {...form}>
        <Form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-primary/20 font-medium shadow-none"
            >
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[31.25rem]">
            <DialogHeader>
              <DialogTitle>Crear nuevo proyecto</DialogTitle>
              <DialogDescription>
                Puedes crear un nuevo proyecto con el nombre y dominio que
                desees.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} size="lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dominio</FormLabel>
                  <FormControl>
                    <Input size="lg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Crear proyecto</Button>
            </DialogFooter>
          </DialogContent>
        </Form>
      </FormWrapper>
    </Dialog>
  );
}

export { CreateNewProjectModal };
