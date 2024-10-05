<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evaluation;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Validation\ValidationException;
class EvaluationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $user = Auth::user();

            // Obtener todas las evaluaciones del usuario autenticado
            $evaluations = $user->evaluations()->with('questions.answerOptions')->get();

            return response()->json($evaluations);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error al obtener las evaluaciones.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            // Validación de los datos
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'questions' => 'required|array',
                'questions.*.question_text' => 'required|string|max:255',
                'questions.*.answer_options' => 'required|array',
                'questions.*.answer_options.*.option_text' => 'required|string|max:255',
                'questions.*.answer_options.*.score' => 'required|integer|min:0|max:10',
            ]);

            // Crear la evaluación
            $evaluation = $user->evaluations()->create([
                'title' => $request->title,
                'description' => $request->description,
            ]);

            // Crear las preguntas y sus opciones de respuesta
            foreach ($request->questions as $questionData) {
                $question = $evaluation->questions()->create([
                    'question_text' => $questionData['question_text'],
                ]);

                foreach ($questionData['answer_options'] as $optionData) {
                    $question->answerOptions()->create($optionData);
                }
            }

            return response()->json($evaluation->load('questions.answerOptions'), 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error al crear la evaluación.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $user = Auth::user();

            // Buscar la evaluación del usuario
            $evaluation = $user->evaluations()->with('questions.answerOptions')->find($id);

            if (!$evaluation) {
                return response()->json(['message' => 'Evaluación no encontrada.'], 404);
            }

            return response()->json($evaluation);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error al obtener la evaluación.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();

            // Validar la entrada
            $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'questions' => 'sometimes|required|array',
                'questions.*.question_text' => 'sometimes|required|string|max:255',
                'questions.*.answer_options' => 'sometimes|required|array',
                'questions.*.answer_options.*.option_text' => 'sometimes|required|string|max:255',
                'questions.*.answer_options.*.score' => 'sometimes|required|integer|min:0|max:10',
            ]);

            // Buscar la evaluación
            $evaluation = $user->evaluations()->find($id);

            if (!$evaluation) {
                return response()->json(['message' => 'Evaluación no encontrada.'], 404);
            }

            // Actualizar la evaluación
            $evaluation->update($request->only('title', 'description'));

            // Actualizar preguntas y opciones de respuesta (si se proporcionaron)
            if ($request->has('questions')) {
                foreach ($request->questions as $questionData) {
                    $question = $evaluation->questions()->updateOrCreate(
                        ['id' => $questionData['id']],
                        ['question_text' => $questionData['question_text']]
                    );

                    foreach ($questionData['answer_options'] as $optionData) {
                        $question->answerOptions()->updateOrCreate(
                            ['id' => $optionData['id']],
                            $optionData
                        );
                    }
                }
            }

            return response()->json($evaluation->load('questions.answerOptions'));
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error al actualizar la evaluación.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $user = Auth::user();

            // Buscar la evaluación
            $evaluation = $user->evaluations()->find($id);

            if (!$evaluation) {
                return response()->json(['message' => 'Evaluación no encontrada.'], 404);
            }

            // Eliminar la evaluación
            $evaluation->delete();

            return response()->json(['message' => 'Evaluación eliminada correctamente.']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error al eliminar la evaluación.', 'error' => $e->getMessage()], 500);
        }
    }
}