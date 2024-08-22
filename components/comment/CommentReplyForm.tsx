"use client";

import { commentSchema, CommentSchema } from "@/server/db/schema/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface Props {
  defaultValues: CommentSchema;
  userName: string;
}

const CommentReplyForm = ({ defaultValues, userName }: Props) => {
  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues,
    mode: "all",
  });

  const onSubmit = (formData: CommentSchema) => {
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{userName}, Comment</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="secondary">
          {!!defaultValues.parentId ? "Send Reply" : "Send Comment"}
        </Button>
      </form>
    </Form>
  );
};
export default CommentReplyForm;
