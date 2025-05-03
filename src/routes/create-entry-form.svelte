<script lang="ts">
  import { decode } from 'decode-formdata';
  import { finite, nonEmpty, number, object, parse, pipe, string } from 'valibot';

  import { db } from '$lib/db';

  import Button from '$lib/ui/button.svelte';
  import Card from '$lib/ui/card/index.svelte';
  import CardActions from '$lib/ui/card/actions.svelte';
  import CardBody from '$lib/ui/card/body.svelte';
  import CardTitle from '$lib/ui/card/title.svelte';
  import Dialog from '$lib/ui/dialog.svelte';
  import Input from '$lib/ui/input.svelte';

  const schema = object({
    name: pipe(string(), nonEmpty()),
    amount: pipe(number(), finite()),
  });

  let open = $state(false);

  async function addEntry(name: string, amount: number) {
    try {
      await db.entry.add({ name, amount, createdAt: new Date() });
    } finally {
      open = false;
    }
  }
</script>

<Dialog bind:open>
  {#snippet trigger(props)}
    <Button type="button" color="primary" {...props}>Create</Button>
  {/snippet}
  {#snippet content()}
    <Card color="neutral">
      <CardTitle><h2>Create Entity</h2></CardTitle>
      <form
        onsubmit={event => {
          event.preventDefault();
          event.stopPropagation();
          if (event.currentTarget.reportValidity()) {
            const data = new FormData(event.currentTarget);
            const payload = decode(data, { numbers: ['amount'] });
            const { name, amount } = parse(schema, payload);
            void addEntry(name, amount);
          }
        }}
      >
        <CardBody>
          <Input type="text" required name="name" />
          <Input type="number" required step="0.01" name="amount" />
        </CardBody>
        <CardActions class="ml-auto">
          <Button type="submit" color="success" class="w-fit">Submit</Button>
        </CardActions>
      </form>
    </Card>
  {/snippet}
</Dialog>
