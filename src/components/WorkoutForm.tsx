import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function WorkoutForm({
  image,
  setImage,
  workout,
  setWorkout,
  onGenerate
}: any) {

  

  const addExercise = () => {
    setWorkout([...workout, { name: "", sets: "", reps: "" }])
  }

  return (
    <div className="space-y-4">
      <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0])} />

      {workout.map(( i: number) => (
        <div key={i} className="flex gap-2">
          <Input
            placeholder="Exercise"
            onChange={(e) => {
              const w = [...workout]
              w[i].name = e.target.value
              setWorkout(w)
            }}
          />
          <Input
            placeholder="Sets"
            onChange={(e) => {
              const w = [...workout]
              w[i].sets = e.target.value
              setWorkout(w)
            }}
          />
          <Input
            placeholder="Reps"
            onChange={(e) => {
              const w = [...workout]
              w[i].reps = e.target.value
              setWorkout(w)
            }}
          />
        </div>
      ))}

      <Button variant="secondary" onClick={addExercise}>
        + Add Exercise
      </Button>

      <Button
        className="w-full"
        disabled={!image || workout.length === 0}
        onClick={onGenerate}
      >
        Generate #EkRepAur Card
      </Button>
    </div>
  )
}
