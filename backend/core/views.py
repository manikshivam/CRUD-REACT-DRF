from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.response import Response
from rest_framework import status

from .models import Todo
from .serializers import TodoSerializer



# CREATE + LIST

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def todos(request):

    if request.method == "GET":

        data = Todo.objects.filter(
            user=request.user
        )

        serializer = TodoSerializer(
            data,
            many=True
        )

        return Response(serializer.data)


    if request.method == "POST":

        serializer = TodoSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                user=request.user
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )


        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )



# UPDATE + DELETE + DETAIL

@api_view(["GET","PUT","DELETE"])
@permission_classes([IsAuthenticated])
def todo_detail(request, id):

    try:

        todo = Todo.objects.get(
            id=id,
            user=request.user
        )

    except Todo.DoesNotExist:

        return Response(
            {
                "error":"Todo not found"
            },
            status=404
        )


    if request.method == "GET":

        serializer = TodoSerializer(todo)

        return Response(serializer.data)



    elif request.method == "PUT":

        serializer = TodoSerializer(
            todo,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data
            )

        return Response(
            serializer.errors,
            status=400
        )



    elif request.method == "DELETE":

        todo.delete()

        return Response(
            {
                "message":"Todo deleted"
            }
        )