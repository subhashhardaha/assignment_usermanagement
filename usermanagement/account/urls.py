from django.urls import path,include

from account.views import AccountListView,AccountCreateView,AccountDeleteView,AccountUpdateView


urlpatterns = [
    path('', AccountListView.as_view(), name='user-list'),
    # path('api/', apis.AccountList.as_view()),
    # path('api/<int:pk>/', apis.AccountDetail.as_view()),
    path('add/',AccountCreateView.as_view(), name='user-add'),
    path('<int:pk>/',AccountUpdateView.as_view(), name='user-update'),
    path('<int:pk>/delete/',AccountDeleteView.as_view(), name='user-delete'),
]

